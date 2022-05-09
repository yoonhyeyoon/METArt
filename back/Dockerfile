FROM openjdk:11

WORKDIR /home/deploy/back

CMD ["./mvn", "clean", "package -Dspring.profiles.active=release -P release"]

ARG JAR_FILE=target/*.jar

COPY * /home/deploy/back/

ENTRYPOINT ["java", "-jar",  "-Dspring.profiles.active=release", "app.jar"]