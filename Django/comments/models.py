from django.db import models

# Create your models here.
from notifications.models import Notification
from posts.models import Post
from django.db.models.signals import post_save, post_delete
from django.conf import settings
from datetime import datetime

User=settings.AUTH_USER_MODEL


class Comment(models.Model):
	post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	body = models.TextField()
	date = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return self.body[:20]

	def username(self):
		return self.user.user_name

	def time_ago(self):
		
		time = datetime.now()
		if self.date == None:
			return None
		if  self.date.minute == time.minute and self.date.hour == time.hour and self.date.day == time.day:
			return "Now"
		elif  self.date.hour == time.hour and self.date.day == time.day:
			return str(time.minute - self.date.minute) + " minutes ago"
		elif self.date.day == time.day:
			return str(time.hour - self.date.hour) + " hours ago"
		else:
			if self.date.month == time.month:
				return str(time.day - self.date.day) + " days ago"
			else:
				if self.date.year == time.year:
					return str(time.month - self.date.month) + " months ago"
		return str(self.date)

	def user_comment_post(sender, instance, *args, **kwargs):
		comment = instance
		post = comment.post
		title = comment.body[:50]
		sender = comment.user
		if sender!=post.user:
			notify = Notification(post=post, sender=sender, user=post.user, title=title ,notification_type=2)
			notify.save()

	def user_del_comment_post(sender, instance, *args, **kwargs):
		like = instance
		post = like.post
		sender = like.user
		if sender!=post.user:
			notify = Notification.objects.filter(post=post, user=post.user, sender=sender, notification_type=2)
			notify.delete()

	

#Comment
post_save.connect(Comment.user_comment_post, sender=Comment)
post_delete.connect(Comment.user_del_comment_post, sender=Comment)