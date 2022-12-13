import os
import json
import azure.functions as func
from azure.cosmos import CosmosClient


def main(req: func.HttpRequest) -> func.HttpResponse:

    # Gets variables specified from local.setting.json file
    endpoint = os.environ["Endpoint"]
    key = os.environ["CosmosDBConnectionString"]
    database_name = os.environ['DatabaseName']
    container_name = os.environ['CollectionName']

    try:
        # Connection to Azure CosmosDB API
        client = CosmosClient(endpoint, key)
        # Gets database we want to query from
        database = client.get_database_client(database_name)
        # Gets container inside the database we want to work with
        container = database.get_container_client(container_name)

        # Finds item ID 1 in container
        item = container.read_item("1", partition_key="1")
        # Gets the value for count and converts it to an int
        GetCountValue = int(item["count"])
        IncrementValue = GetCountValue + 1  # Increments count value by 1
        # Passes incremented count value back to dictionary
        item["count"] = str(IncrementValue)
        # Uploads dictionary back to the Cosmos DB with updated count value
        updated_item = container.upsert_item(item)

        return func.HttpResponse(json.dumps(item), status_code=200)

    except Exception as error:
        print(error)
        return func.HttpResponse(json.dumps(item), status_code=200)
