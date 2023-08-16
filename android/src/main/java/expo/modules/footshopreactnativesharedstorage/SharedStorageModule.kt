package expo.modules.footshopreactnativesharedstorage

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.modules.Promise

data class SetOptions(
    @Field
    var storageKey: String = "",

    @Field
    var key: String = "",

    @Field
    var data: Any? = null
)

data class GetOptions(
    @Field
    var storageKey: String = "",

    @Field
    var key: String = ""
)

data class RemoveOptions(
    @Field
    var storageKey: String = "",

    @Field
    var key: String = ""
)

class SharedStorageModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SharedStorage")

        AsyncFunction("get") { options: GetOptions, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options.storageKey)
                if (options.key.isNotBlank()) {
                    try {
                        val value = sharedPreferences.getString(options.key, null)
                        promise.resolve(value)
                    } catch (e: Exception) {
                        promise.reject("GET_ERROR", "An error occurred while retrieving data.", e)
                    }
                } else {
                    promise.reject("INVALID_OPTIONS", "The 'key' option is missing.")
                }
            }
        }

        AsyncFunction("set") { options: SetOptions, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options.storageKey)
                if (options.key.isNotBlank() && options.data != null) {
                    try {
                        val editor = sharedPreferences.edit()
                        editor.putString(options.key, options.data.toString())
                        editor.apply()
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("SET_ERROR", "An error occurred while saving data.", e)
                    }
                } else {
                    promise.reject("INVALID_OPTIONS", "The 'key' and 'data' options are required.")
                }
            }
        }

        AsyncFunction("remove") { options: RemoveOptions, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options.storageKey)
                if (options.key.isNotBlank()) {
                    try {
                        val editor = sharedPreferences.edit()
                        editor.remove(options.key)
                        editor.apply()
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("REMOVE_ERROR", "An error occurred while removing data.", e)
                    }
                } else {
                    promise.reject("INVALID_OPTIONS", "The 'key' option is missing.")
                }
            }
        }
    }

    private fun getSharedPreferences(storageKey: String): SharedPreferences {
        val context = getContext()
        return context.getSharedPreferences(storageKey, Context.MODE_PRIVATE)
    }
}
