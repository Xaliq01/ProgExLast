from django.db import models
from django.urls import reverse

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=60, db_index=True)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Time_create", null=True)
    time_update = models.DateTimeField(auto_now=True, verbose_name="Time_update", null=True)
    is_published = models.BooleanField(default=True, verbose_name="Status")
    description = models.TextField(null=True, blank=True)


    def __str__(self):
        return self.name


    def get_absolute_url(self):
        return reverse("category", kwargs={"cat_id": self.pk})



class Tag(models.Model):
    name = models.CharField(max_length=300, verbose_name="Ad")
    status = models.BooleanField(default=True, verbose_name="Status")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Yaranma tarixi")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Yenilənmə tarixi")

    def __str__(self):
        return self.name


class Gender(models.Model):
    gender = models.CharField(max_length=300, verbose_name="Ad")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Yaranma tarixi")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Yenilənmə tarixi")

    def __str__(self):
        return self.gender

class Author(models.Model):
    gender = models.ForeignKey(Gender, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="Cinsi")
    name = models.CharField(max_length=300, verbose_name="Ad")
    surname = models.CharField(max_length=300, verbose_name="Soyad")
    age  = models.PositiveIntegerField(verbose_name="Yaş")
    birthday = models.DateField(verbose_name="Doğum tarixi")
    status = models.BooleanField(default=True, verbose_name="Status")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Yaranma tarixi")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Yenilənmə tarixi")

    def __str__(self):
        return self.name

class Product(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=300, verbose_name="Ad")
    price = models.FloatField(verbose_name="Qiymət")
    # tax_price = models.FloatField(blank=True, null=True, verbose_name="Tax qiymət")
    # discount_price = models.FloatField(blank=True, null=True, verbose_name="Endirimli qiymət")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Tag")
    status = models.BooleanField(default=True, verbose_name="Status")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Yaranma tarixi")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Yenilənmə tarixi")

    # CATEGORY_CHOICES = [
    #     ('chair', 'Chair'),
    #     ('beds', 'Beds'),
    #     ('sofa', 'Sofa'),
    #     ('lamp', 'Lamp'),
    # ]
    # category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='chair')
    image = models.ImageField(upload_to='products/', blank=True, null=True)


    def __str__(self):
        return self.name
    

class News(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    description = models.TextField(blank=True, verbose_name="Content", null=True)
    image = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Image", null=True, blank=True)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Time_create", null=True)
    time_update = models.DateTimeField(auto_now=True, verbose_name="Time_update", null=True)
    is_published = models.BooleanField(default=True, verbose_name="Status", null=True)
    cat = models.ForeignKey(Category, on_delete=models.PROTECT, null=True, related_name="newss")
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Author")
    tags = models.ManyToManyField(Tag, blank=True, verbose_name="Tags")  
    

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse("news_detail", kwargs={"news_id": self.pk})
    
class Developer(models.Model):
    gender = models.ForeignKey(Gender, on_delete=models.SET_NULL, blank=True, null=True, verbose_name="Cinsi")
    name = models.CharField(max_length=300, verbose_name="Ad")
    surname = models.CharField(max_length=300, verbose_name="Soyad")
    position = models.CharField(max_length=300, verbose_name="Position", default="Developer")
    age = models.PositiveIntegerField(verbose_name="Yaş")
    experience = models.PositiveIntegerField(verbose_name="Experience (years)", default=1)
    birthday = models.DateField(verbose_name="Doğum tarixi")
    image = models.ImageField(upload_to='developers/', blank=True, null=True)
    status = models.BooleanField(default=True, verbose_name="Status")
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Yaranma tarixi")
    time_update = models.DateTimeField(auto_now=True, verbose_name="Yenilənmə tarixi")

    def __str__(self):
        return f"{self.name} {self.surname}"


class About_us(models.Model):
    title = models.CharField(max_length=255, verbose_name="Title")
    description = models.TextField(blank=True, verbose_name="Content", null=True)
    # image = models.ImageField(upload_to="photo/%Y/%m/%d/", verbose_name="Image", null=True, blank=True)
    time_create = models.DateTimeField(auto_now_add=True, verbose_name="Time_create", null=True)
    time_update = models.DateTimeField(auto_now=True, verbose_name="Time_update", null=True)
    is_published = models.BooleanField(default=True, verbose_name="Status", null=True)

    def __str__(self):
        return self.title
    


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name}"




class Testimonial(models.Model):    
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    text = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.name} - {self.position}"
# Add to your models.py
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField()
    payment_method = models.CharField(max_length=50, choices=[
        ('credit_card', 'Credit Card'),
        ('paypal', 'PayPal'),
        ('bank_transfer', 'Bank Transfer')
    ], default='credit_card')
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ], default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order #{self.id} - {self.product.name}"

    class Meta:
        ordering = ['-order_date']



class Investment(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='investments/')
    security_type = models.CharField(max_length=100)
    investment_multiple = models.CharField(max_length=50)
    maturity = models.CharField(max_length=50)
    min_investment = models.CharField(max_length=50)
    raised_amount = models.DecimalField(max_digits=10, decimal_places=2)
    goal_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('investment_detail', kwargs={'pk': self.pk})
    
    def progress_percent(self):
        return int((self.raised_amount / self.goal_amount) * 100)
