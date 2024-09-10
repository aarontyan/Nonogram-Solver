# Start Flask app
cd /home/ec2-user/backend
FLASK_APP=app.py flask run --host=0.0.0.0 --port=5000 &

# Start React app
cd /var/www/html/frontend
nohup serve -s build -l 3000 &