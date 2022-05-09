FROM openjdk:11

WORKDIR /home/deploy/back

COPY *.* /home/deploy/back/

RUN mvn clean package -Dspring.profiles.active=release -P release

COPY . /home/deploy/back/

#CMD ["./mvnw", "clean", "package -Dspring.profiles.active=release -P release"]
#CMD ["./mvnw", "clean", "package"]

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} /home/deploy/back/app.jar

CMD ["java", "-jar",  "-Dspring.profiles.active=release", "target/metart-0.0.1-SNAPSHOT.jar"]