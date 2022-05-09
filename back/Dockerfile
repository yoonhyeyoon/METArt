FROM openjdk:11

WORKDIR /home/deploy/back

CMD ["./mvn", "clean", "package -Dspring.profiles.active=release -P release"]

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar",  "-Dspring.profiles.active=release", "app.jar"]