FROM openjdk:11

COPY *.* /home/deploy/back/

ENTRYPOINT ["java", "-jar",  "-Dspring.profiles.active=release", "app.jar"]