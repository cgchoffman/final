#!/usr/bin/env python3

import urllib.request
import urllib.parse
import os
import json


class Location(object):
    def __init__(self, jsonLocation):
        self.name = jsonLocation['name']
        self.locId = jsonLocation['id']
        self.geoCode = jsonLocation['geoCode']
        self.address = jsonLocation['address']
        self.logo = None
        self.URL = None
        self.photos = None
        self.profile = None
        
    def getDetails(self):
        pass # make a call to GetBusinessDetails for the locations id
        # fill in available details as properties of the Location Object
        # eg. logo, URL, photos, profile,
        
    def toString(self):
        slocation = """Name: %s\n
    geoCode: %s\n
    address: %s\n
    logo: %s\n                   
    URL: %s\n
    Photos: %s\n
    profile: %s\n""" %(self.name, self.geoCode, self.address, self.logo, self.URL, self.photos, self.profile)
        print(slocation)

config = json.loads(open("config", "r").read())
dataFile = "locations.json"
keywords = "craft beer brewery craftbeer"
uid = "6043765045"
where = "Vancouver"
Sapikey = config["sandkey"] # Sandbox key
Papikey = config["prodkey"]  # Production key
frmt = "JSON" # return format of api response
Syurl = "http://api.sandbox.yellowapi.com" # Sandbox API URL, do NOT interchange keys and URLs.  Only SandKey with SandURL
Pyurl = "http://api.yellowapi.com"
findBusiness = "FindBusiness"
baseRequestObj = {"apikey" : Sapikey, # Sandbox key
                  # "apikey" : Papikey, # Production key
                  "UID" : uid,
                  "fmt" : frmt,
                  "pg" : 1,
                  }
getBusinessesReq = dict(baseRequestObj.items(), what=keywords, where=where) 
# Create request to get businesses based on keywords
data = urllib.parse.urlencode(getBusinessesReq)
fullURL = urllib.parse.urljoin(Syurl, findBusiness + "/?" + data)
# print(fullURL)
# req = urllib.request.Request(fullURL)
repJSON = {}
with urllib.request.urlopen(fullURL) as rep:
    repJSON = json.loads(rep.read().decode('utf-8'))

listings = repJSON['listings']
data = []
for item in listings:
    location = Location(item)
    data.append(location.__dict__)
    # location.toString()

# with open(dataFile, "w") as f:
#     f.write(json.dumps(data))

f = open(dataFile,"w")
f.write(json.dumps(data))
f.close()
    
# def buildReqURL():


# print(repJSON)