FROM openjdk:11

WORKDIR /home/deploy/back

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar",  "-Dspring.profiles.active=release", "app.jar", "--server.servlet.context-path=/api"]