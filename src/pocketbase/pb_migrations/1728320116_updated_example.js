/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qgzmrfq4wz9kvss")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id != \"\""
  collection.deleteRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qgzmrfq4wz9kvss")

  collection.listRule = "@request.headers.Authorization != \"\""
  collection.viewRule = "@request.headers.Authorization != \"\""
  collection.updateRule = "@request.headers.Authorization != \"\""
  collection.deleteRule = "@request.headers.Authorization != \"\""

  return dao.saveCollection(collection)
})
