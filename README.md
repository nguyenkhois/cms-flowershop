# CMS - Flower shop
This web application is only using for my study about Headless CMS. You may want to know how to start [here](./HOWTO.md).

## Table of contents
* Requirement
    * [Docker installation](https://www.docker.com/get-started)
    * [MongoDB](https://hub.docker.com/_/mongo/)
    * [Strapi](https://hub.docker.com/r/strapi/strapi/)
* Structure
    * [Application structure](#application-structure)
    * [Database structure](#database-structure)
* Deployment
    * [The simple Express server in Docker file](https://github.com/nguyenkhois/expressjs-docker-simple-server)
    * [My deployment](https://hub.docker.com/r/khois/expresssrv/)


## Structure
### Application structure

![Appplication structure](./docs/app.png)

### Database structure

| Content type | Field | Data type | Note |
|---|---|---|---|
|**category**|__id_| String|Auto generated by Strapi (**1**)|
||name|String|Category name|
|**product**|__id_|String|Auto generated by Strapi (**2**)|
||name|String|Product name|
||description|Text||
||price|Decimal||
||inStock|Integer||
||_categoryId_|String|Get from (**1**)|
||image|Media||
|**order**|_id|String|Auto generated by Strapi|
||customerInfo|JSON|Customer information|
||orderedProducts|JSON||
||sum|Decimal||
||isDelivered|Boolean||
|**review**|_id|String|Auto generated by Strapi|
||_productId_|String|Get from (**2**)|
||content|Text|Reviewer comment|
||rating|Integer||
||name|String|Reviewer name|
||email|Email|Reviewer email|

## References
* [Strapi tutorials](https://strapi.io/documentation/tutorials/)
* [Express server config for React-Router](https://github.com/reactjs/react-router-tutorial/blob/master/lessons/11-productionish-server/README.md)