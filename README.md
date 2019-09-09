# Headless CMS and Docker - Flower shop
This web application is only using for my study about Headless CMS - [Strapi](http://strapi.io), [Docker](https://www.docker.com/) and [Amazon Web Services (AWS)](https://aws.amazon.com/). You may want to know more information that is below and how to start [here](./HOWTO.md).

![How it works](./docs/howitworks.png)

## Table of contents
* [Main information](#main-information)
    * [Screenshot](#screenshot)
    * [How it works](#how-it-works)
* Requirement
    * [Docker installation](https://www.docker.com/get-started)
    * [MongoDB](https://hub.docker.com/_/mongo/)
    * [Strapi](https://hub.docker.com/r/strapi/strapi/)
* Structure
    * [Application structure](#application-structure)
    * [Database structure](#database-structure)
* [Deployment](#deployment)
    * [The simple Express server in Dockerfile on GitHub](https://github.com/nguyenkhois/expressjs-docker-simple-server)
    * [My deployment on Docker Hub](https://hub.docker.com/r/khois/expresssrv/)
* Find me on
    * [GitHub](https://github.com/nguyenkhois)
    * [npm](https://www.npmjs.com/~nguyenkhois)
    * [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=KhoiLe.extra-react-snippets)
    * [Docker Hub](https://hub.docker.com/u/khois/)

## Main information
This project is using of many dependencies and other things like Strapi, Docker, Amazon Web Services - EC2 (Linux).

|Main information|Version|Notes|
|---|:---:|---|
|Pure JavaScript|ES6 and ES7|Using also for React auto binding|
|Bootstrap|4.1.3|Using for grid layout|
|React|16.5.2||
|Redux|4||
|React-Router|4.3.1||
|Strapi|3.0.0 alpha 14.1.1||
|Docker|18|Linux container|
|Amazon Web Services (AWS)|Linux|EC2|
|Babel|7.1|With Babel Loader 8|
|Webpack|4.19.1||
|Webpack Dev Server|3.1.8|With code splitting|

### Screenshot
![Screenshot](./docs/screenshot.png)

### How it works

![How it works](./docs/howitworks.png)

All these things are in Docker on a Linux server (AWS):
* Strapi
* MongoDB
* My React app (cms-flowershop) is in a Dockerfile

## Structure
### Application structure

![Appplication structure](./docs/app.png)

### Database structure

| Content type | Field | Data type | Key | Note |
|---|---|---|---|--|
|**category**|__id_| String|Primary key | Auto generated by Strapi (**1**)|
||name|String| |Category name|
|**product**|__id_|String| Primary key |Auto generated by Strapi (**2**)|
||name|String| |Product name|
||description|Text| ||
||price|Decimal| ||
||inStock|Integer| ||
||_categoryId_|String|Foreign key |Get from (**1**)|
||image|Media|| |
|**order**|_id|String|Primary key |Auto generated by Strapi|
||customerInfo|JSON| |Customer information|
||orderedProducts|JSON| ||
||sum|Decimal| ||
||isDelivered|Boolean| ||
|**review**|_id|String|Primary key |Auto generated by Strapi|
||_productId_|String|Foreign key |Get from (**2**)|
||content|Text| |Reviewer comment|
||rating|Integer| ||
||name|String| |Reviewer name|
||email|Email| |Reviewer email|

## Deployment
![Deployment](./docs/dockerfile.png)

You may want to view [My Dockerfile](https://github.com/nguyenkhois/expressjs-docker-simple-server) in the other repository on my GitHub page.

## References
* [Strapi tutorials](https://strapi.io/documentation/tutorials/)
* [Express server config for React-Router](https://github.com/reactjs/react-router-tutorial/blob/master/lessons/11-productionish-server/README.md)
* [Browserslist](https://github.com/browserslist/browserslist)
