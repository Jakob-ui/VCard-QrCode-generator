# VCard-QR-Code-Generator

Dieses Projekt ist eine Webanwendung, die aus bestimmten Eingabedaten einen QR-Code generiert. Scannt man diesen QR-Code mit einem Smartphone, werden die Kontaktdaten der Person als VCard (visitenkarte) erkannt und können einfach zum Adressbuch hinzugefügt werden.

## Docker

Die Anwendung kann einfach mithilfe des mitgelieferten `Dockerfile` als Docker-Image gebaut und ausgeführt werden.

## Technologie

* **Webserver:** Nginx
* **Interner Port:** 4000
* **Frontend:** Angular
* **Server-Side Rendering (SSR):** Implementiert für eine schnellere initiale Seitenladezeit und verbesserte Performance.

## Verwendung

1.  **Docker Image bauen (optional):**
    Navigiere zum Hauptverzeichnis des Projekts und führe folgenden Befehl aus:
    ```bash
    docker build -t vcard-qrcode-generator .
    ```

2.  **Docker Container starten:**
    ```bash
    docker run -p 80:4000 vcard-qrcode-generator
    ```
    oder wenn du das Image selbst gebaut hast:
    ```bash
    docker run -p 80:4000 <dein-image-name>
    ```
    Die Anwendung ist nun unter `http://localhost` (oder der entsprechenden IP-Adresse deines Docker-Hosts) im Browser erreichbar.

3.  **Daten eingeben:**
    Über die Benutzeroberfläche kannst du die relevanten Kontaktdaten (Name, Telefonnummer, E-Mail, etc.) eingeben.

4.  **QR-Code generieren:**
    Nachdem du alle Daten eingegeben hast, klicke auf den "Generieren"-Button. Die Anwendung erstellt daraufhin einen QR-Code.

5.  **QR-Code scannen:**
    Öffne die Kamera-App deines Smartphones oder eine QR-Code-Scanner-App und richte sie auf den generierten QR-Code.

6.  **Kontaktdaten speichern:**
    Dein Smartphone erkennt die VCard-Daten und bietet dir an, den Kontakt zu speichern.

## Features

* Einfache und intuitive Benutzeroberfläche.
* Generierung von QR-Codes im VCard-Format.
* Download des Qr-Codes als PNG
* Dockerisierung für einfache Bereitstellung.
* Schnelle Performance dank Server-Side Rendering mit Angular.