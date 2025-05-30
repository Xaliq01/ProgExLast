
from django.utils import timezone
from venv import logger
from django.http import Http404, HttpResponse, HttpResponseNotFound
from django.shortcuts import get_object_or_404, redirect, render
from django.db.models import Count, Q
from news.models import About_us, Category, ContactMessage, Developer, Investment, News, Order, Product, Testimonial
from django.core.mail import send_mail

menu = [
    {"title": "Home", "url": "home"},
    {"title": "About", "url": "about"},
    {"title": "Contact", "url": "contact"},
]

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'news/product_detail.html', {'product': product})

def all_products(request):
    category = request.GET.get('category', 'all')
    products = Product.objects.filter(status=True)
    
    if category != 'all':
        products = products.filter(category=category)
    
    context = {
        'products': products,
        'product_categories': Product.CATEGORY_CHOICES,
        'active_category': category,
        'title': 'All Products',
        'menu': menu
    }
    return render(request, 'news/all_products.html', context)

def best_selling_products(request):
    category = request.GET.get('category', 'all')  # По умолчанию показываем все
    products = Product.objects.filter(status=True)
    
    if category != 'all':
        products = products.filter(category=category)
    
    context = {
        'products': products[:8],  # Берем первые 8 товаров
        'active_category': category,
        'title': 'Best Selling Products',
        'menu': menu
    }
    return render(request, 'news/index.html', context)

def index(request):
    investments = Investment.objects.filter(is_active=True).exclude(pk__isnull=True)
    products = Product.objects.filter(status=True)
    investments = Investment.objects.filter(is_active=True)  # Actually get the queryset
    logger.debug(f"Found products: {products}")
    
    context = {
        "title": "Home",
        "menu": menu,
        "posts": News.objects.all(),
        "categories": Category.objects.all(),
        "cat_selected": 0,
        "products": products[:8],
        "active_category": "all",
        "investments": investments  # Add investments to context
    }

    return render(request, "news/index.html", context)

# Остальные функции остаются без изменений
def error(request):
    context = {
        "title": "Error",
        "menu": menu
    }
    return render(request, "news/error.html", context)

def pageNotFound(request, exception):
    return HttpResponseNotFound("UPSSS! Not Found")

def categories(request, cat_id):
    news = News.objects.filter(cat_id=cat_id)
    cat = Category.objects.all()

    if len(news) == 0:
        raise Http404()
    
    context = {
        "news": news,
        "categories": cat,
        "cat_selected": cat_id,
        "title": "Categories",
        "menu": menu,
        "products": Product.objects.filter(status=True)
    }
    return render(request, "news/categories.html", context)

def news_detail(request, news_id):
    news = get_object_or_404(
        News.objects.select_related('cat', 'author').prefetch_related('tags'),
        id=news_id,
        is_published=True
    )

    related_news = News.objects.filter(
        cat=news.cat,
        is_published=True
    ).exclude(id=news.id).order_by('-time_create')[:3]

    if not related_news.exists():
        related_news = News.objects.filter(
            tags__in=news.tags.all(),
            is_published=True
        ).exclude(id=news.id).distinct().order_by('-time_create')[:3]

    if not related_news.exists():
        related_news = News.objects.filter(
            is_published=True
        ).exclude(id=news.id).order_by('-time_create')[:3]

    context = {
        "news": news,
        "related_news": related_news,
        "title": f"{news.title} | Детали новости",
        "menu": menu,
        "categories": Category.objects.filter(is_published=True),
        "cat_selected": news.cat.id,
    }
    return render(request, "news/standard-formate.html", context)

def categories_list(request):
    categories = Category.objects.all()  
    return render(request, 'news/categories_list.html', {
        'categories': categories,
        'menu': menu
    })

def category_detail(request, category_id):
    category = get_object_or_404(Category, id=category_id) 
    return render(request, 'news/category_detail.html', {
        'category': category,
        'menu': menu
    })


def about_us(request):
    about_content = About_us.objects.filter(is_published=True).first()
    developers = Developer.objects.filter(status=True)
    
    context = {
        'about': about_content,
        'developers': developers,  # Здесь правильно - 'developers'
    }
    return render(request, 'news/about_us.html', context)

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        ContactMessage.objects.create(
            name=name,
            email=email,
            message=message
        )
        return redirect('contact_success')  # Перенаправляем на страницу успеха
    
    return render(request, 'news/contact.html')

def contact_success(request):
    return render(request, 'news/contact_success.html')

def testimonials_view(request):
    testimonials = Testimonial.objects.filter(is_active=True)
    return render(request, 'your_template.html', {'testimonials': testimonials})


def create_order(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    
    if request.method == 'POST':
        # Create the order
        order = Order.objects.create(
            product=product,
            customer_name=request.POST.get('name'),
            customer_email=request.POST.get('email'),
            customer_phone=request.POST.get('phone'),
            address=request.POST.get('address'),
            payment_method=request.POST.get('payment_method'),
            total_price=product.price,
            order_date=timezone.now()
        )
        
        # Redirect to order confirmation page
        return redirect('order_confirmation', order_id=order.id)
    
    # If GET request, show order form
    return render(request, 'news/order_form.html', {'product': product})

def order_confirmation(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(request, 'news/order_confirmation.html', {'order': order})

def investment_list(request):
    investments = Investment.objects.filter(is_active=True)
    return render(request, 'news/investment_list.html', {'investments': investments})

def investment_detail(request, pk):
    investment = get_object_or_404(Investment, pk=pk)  # Импортируй: from django.shortcuts import get_object_or_404
    return render(request, 'news/investment_detail.html', {'investment': investment})




def apply_online(request):
    return render(request, 'news/apply_online.html')