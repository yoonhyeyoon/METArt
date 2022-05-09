FROM openjdk:11

WORKDIR /home/deploy/back

COPY . /home/deploy/back/

ENTRYPOINT ["java", "-jar",  "-Dspring.profiles.active=release", "app.jar"]