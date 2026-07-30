# Stage 1: Build the application using Maven and JDK 21

FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy the build configuration file first to leverage caching

COPY pom.xml .

RUN mvn dependency:go-offline -B

# Copy source code and build the package

COPY src ./src

RUN mvn clean package -DskipTests

# Stage 2: Create a minimal production runtime

FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the compiled jar from the build stage

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

