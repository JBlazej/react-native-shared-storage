import ExpoModulesCore

struct SetOptions: Record {
    @Field
    var suiteName: String = ""

    @Field
    var key: String = ""

    @Field
    var data: Any?
}

struct GetOptions: Record {
    @Field
    var suiteName: String = ""

    @Field
    var key: String = ""
}

struct RemoveOptions: Record {
    @Field
    var suiteName: String = ""

    @Field
    var key: String = ""
}

public class SharedStorageModule: Module {
    public func definition() -> ModuleDefinition {
        Name("SharedStorage")

        AsyncFunction("set") { (options: SetOptions, promise: Promise) -> Void in
            guard let sharedDefaults = UserDefaults(suiteName: options.suiteName) else {
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
            guard let sharedDefaults = UserDefaults(suiteName: options.suiteName) else {
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
            if let sharedDefaults = UserDefaults.init(suiteName: options.suiteName) {
                sharedDefaults.removeObject(forKey: options.key)
                sharedDefaults.synchronize()
                promise.resolve(nil)
            } else {
                promise.reject("DELETE_ITEM_ERROR", "User defaults is nil")
            }
        }.runOnQueue(.main)
    }
}
