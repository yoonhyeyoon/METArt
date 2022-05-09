FROM openjdk:11

WORKDIR /home/deploy/back

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar",  "-Dsping.profiles.active=release", "app.jar"]