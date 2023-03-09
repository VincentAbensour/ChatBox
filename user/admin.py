from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from user.models import Account

class AccountAdmin(UserAdmin):
    ordering = ['id']
    list_display = ['email', 'username',]
    fieldsets = (
        (None,{'fields':('password',)}),
        (
            'Identity', {'fields':
                                    ('email',
                                    'username',)}
        ),
        (
            'Permissions', {'fields':
                                    ('is_active',
                                    'is_staff',
                                    'is_admin',
                                    'is_superuser')}
        ),
        (
            'Dates', {'fields':('last_login',)}
        )
    )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
        'fields':(
            'email',
            'username',
            'password1',
            'password2',
            'is_active',
            'is_staff',
            'is_admin',
            'is_superuser'
        )
        }),
    )

admin.site.register(Account, AccountAdmin)

