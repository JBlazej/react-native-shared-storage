import ExpoModulesCore

struct SetOptions: Record {
    @Field
    var storageKey: String = ""

    @Field
    var key: String = ""

    @Field
    var data: Any?
}

struct GetOptions: Record {
    @Field
    var storageKey: String = ""

    @Field
    var key: String = ""
}

struct RemoveOptions: Record {
    @Field
    var storageKey: String = ""

    @Field
    var key: String = ""
}

struct GetAllKeysOptions: Record {
    @Field
    var storageKey: String = ""
}

struct ContainsOptions: Record {
    @Field
    var storageKey: String = ""

    @Field
    var key: String = ""
}

public class SharedStorageModule: Module {
    public func definition() -> ModuleDefinition {
        Name("SharedStorage")

        AsyncFunction("set") { (options: SetOptions, promise: Promise) -> Void in
            guard let sharedDefaults = UserDefaults(suiteName: options.storageKey) else {
                promise.reject("SET_ITEM_ERROR", "User defaults is nil")
                return
            }

            sharedDefaults.setValue(options.data, forKey: options.key)
            sharedDefaults.synchronize()

            switch options.data {
            case let jsonString as String:
                promise.resolve(jsonString)
            case let jsonDictionary as [String: Any]:
                if let jsonData = try? JSONSerialization.data(withJSONObject: jsonDictionary),
                   let jsonString = String(data: jsonData, encoding: .utf8) {
                    promise.resolve(jsonString)
                } else {
                    promise.reject("SET_ITEM_ERROR", "Failed to store data")
                }
            default:
                promise.reject("SET_ITEM_ERROR", "Failed to store data")
            }
        }.runOnQueue(.main)

        AsyncFunction("get") { (options: GetOptions, promise: Promise) -> Void in
            guard let sharedDefaults = UserDefaults(suiteName: options.storageKey) else {
                promise.reject("GET_ITEM_ERROR", "User defaults is nil")
                return
            }

            guard let storedData = sharedDefaults.value(forKey: options.key) else {
                promise.reject("GET_ITEM_ERROR", "Data not found")
                return
            }

            if let jsonString = storedData as? String {
                promise.resolve(jsonString)
            } else if let jsonData = storedData as? Data, let jsonString = String(data: jsonData, encoding: .utf8) {
                promise.resolve(jsonString)
            } else {
                promise.reject("GET_ITEM_ERROR", "Failed to retrieve data")
            }
        }.runOnQueue(.main)

        AsyncFunction("remove") { (options: RemoveOptions, promise: Promise) -> Void in
            if let sharedDefaults = UserDefaults.init(suiteName: options.storageKey) {
                sharedDefaults.removeObject(forKey: options.key)
                sharedDefaults.synchronize()
                promise.resolve(nil)
            } else {
                promise.reject("DELETE_ITEM_ERROR", "User defaults is nil")
            }
        }.runOnQueue(.main)

        AsyncFunction("getAllKeys") { (options: GetAllKeysOptions, promise: Promise) -> Void in
            guard let sharedDefaults = UserDefaults(suiteName: options.storageKey) else {
                promise.reject("GET_ALL_KEYS_ERROR", "User defaults is nil")
                return
            }

            let allKeys = sharedDefaults.dictionaryRepresentation().keys.map { $0 as String }
            promise.resolve(allKeys)
        }.runOnQueue(.main)

        AsyncFunction("contains") { (options: ContainsOptions, promise: Promise) -> Void in
            guard let sharedDefaults = UserDefaults(suiteName: options.storageKey) else {
                promise.reject("CONTAINS_ERROR", "User defaults is nil")
                return
            }

            let containsKey = sharedDefaults.object(forKey: options.key) != nil
            promise.resolve(containsKey)
        }.runOnQueue(.main)
    }
}
