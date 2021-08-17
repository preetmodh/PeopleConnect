from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, post_delete
from django.utils.text import slugify

from notifications.models import Notification
#from gdstorage.storage import GoogleDriveStorage

# Define Google Drive Storage
#gd_storage = GoogleDriveStorage()

User=settings.AUTH_USER_MODEL



def user_directory_path(instance, filename):
    # MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)



class Tag(models.Model):
	name = models.CharField(max_length=75, verbose_name='Tag')
	slug = models.SlugField(null=False, unique=True)

		
	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = slugify(self.title)
		return super().save(*args, **kwargs)


# Create your models here.
class Post(models.Model):
	title = models.TextField(max_length=150,blank=True, verbose_name='title')
	id = models.AutoField(primary_key=True, editable=False)
	Image =  models.ImageField(upload_to=user_directory_path, blank=True, null=True, verbose_name='Image')
	caption = models.TextField(max_length=1500,blank=True, verbose_name='Caption')
	posted = models.DateTimeField(auto_now_add=True)
	tags = models.ManyToManyField(Tag, related_name='tags')
	user = models.ForeignKey(User, on_delete=models.CASCADE,related_name='post_user')
	likes = models.IntegerField(default=0)
	class Meta:
		ordering=['-posted']
	def __str__(self):
		return str(self.title)
	def username(self):
		return self.user.user_name
	def userphoto(self):
		return self.user.picture
	



class Likes(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_like')
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_like')
	class Meta:
		unique_together=('user','post')
	def user_liked_post(sender, instance, *args, **kwargs):
		like = instance
		post = like.post
		sender = like.user
		if sender!=post.user:
			notify = Notification(post=post, sender=sender, user=post.user, notification_type=1)
			notify.save()
		post.likes+=1
		post.save()

	def user_unlike_post(sender, instance, *args, **kwargs):
		like = instance
		post = like.post
		sender = like.user
		post.likes-=1
		post.save()
		if sender!=post.user:
			notify = Notification.objects.filter(post=post, sender=sender, notification_type=1)
			notify.delete()
		

	def __str__(self):
		return str(self.post)

post_save.connect(Likes.user_liked_post, sender=Likes)
post_delete.connect(Likes.user_unlike_post, sender=Likes)

