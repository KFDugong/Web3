# Use the official MongoDB image
FROM mongo

# Expose the desired port for MongoDB (default: 27017)
EXPOSE 27017

# Set the MongoDB data directory
ENV MONGO_DATA_DIR /data/db

# Set the command to start MongoDB
CMD ["mongod", "--bind_ip_all"]
