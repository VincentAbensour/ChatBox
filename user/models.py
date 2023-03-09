from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class AccountManager(BaseUserManager):
    def create_user(self,username,email,password=None):
        """Create new basic user"""
        if not email:
            raise ValueError("Email adress is missing")

        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,username,email,password):
        """Create new superuser"""
        user=self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.is_admin = True


        user.save()
        return user

class Account(AbstractBaseUser,PermissionsMixin):
    """Custom Account Class"""
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]

    objects = AccountManager()

    def __str__(self):
        return self.email
