from pymongo import MongoClient
from pprint import pprint

mongoUrl = ""

client = MongoClient(monogoUrl)
db=client.admin
serverStatusResult=db.command("serverStatus")
pprint(serverStatusResult)
