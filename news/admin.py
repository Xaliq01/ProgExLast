from django.utils.html import format_html
from django.contrib import admin
from .models import About_us, Author, ContactMessage, Developer, Gender, Investment, News, Category, Product, Tag, Testimonial


class NewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'image_preview', 'time_create', 'time_update', 'is_published', 'cat']
    list_editable = ["is_published"]
    list_display_links = ["title"]
    list_filter = ['is_published']
    search_fields = ['title']
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:  # Проверяем, есть ли изображение
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover;"/>', obj.image.url)
        return "(No Image)"

    image_preview.short_description = "Превью"

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'time_create', 'time_update', 'is_published']
    list_display_links = ["name"]
    list_filter = ['is_published']
    list_editable = ["is_published"]

class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'raised_amount', 'goal_amount', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'location')
    fieldsets = (
        (None, {
            'fields': ('title', 'location', 'description', 'short_description')
        }),
        ('Financial Details', {
            'fields': ('security_type', 'investment_multiple', 'maturity', 'min_investment', 'raised_amount', 'goal_amount')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )


admin.site.register(News, NewsAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register([Tag, Author, Product, Gender,About_us,Developer,ContactMessage,Testimonial,Investment])
