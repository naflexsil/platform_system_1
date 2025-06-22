echo "Ждём RabbitMQ на $RABBITMQ_HOST:$RABBITMQ_PORT..."
while ! nc -z $RABBITMQ_HOST $RABBITMQ_PORT; do
  sleep 2
done

echo "RabbitMQ доступен. Запускаем сервис..."
exec "$@"