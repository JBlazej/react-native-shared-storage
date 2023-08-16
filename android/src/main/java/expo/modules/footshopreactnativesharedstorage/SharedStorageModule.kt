package expo.modules.footshopreactnativesharedstorage

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.modules.Promise

class SharedStorageModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("SharedStorage")

        AsyncFunction("get") { options: Map<String, String>, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options)
                val key = options["key"]
                if (key != null) {
                    try {
                        val value = sharedPreferences.getString(key, null)
                        promise.resolve(value)
                    } catch (e: Exception) {
                        promise.reject("GET_ERROR", "An error occurred while retrieving data.", e)
                    }
                } else {
                    promise.reject("INVALID_OPTIONS", "The 'key' option is missing.")
                }
            }
        }

        AsyncFunction("set") { options: Map<String, String>, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options)
                val key = options["key"]
                val value = options["value"]
                if (key != null && value != null) {
                    try {
                        val editor = sharedPreferences.edit()
                        editor.putString(key, value)
                        editor.apply()
                        promise.resolve(null)
                    } catch (e: Exception) {
                        promise.reject("SET_ERROR", "An error occurred while saving data.", e)
                    }
                } else {
                    promise.reject("INVALID_OPTIONS", "The 'key' and 'value' options are required.")
                }
            }
        }

        AsyncFunction("remove") { options: Map<String, String>, promise: Promise ->
            launch(Dispatchers.Main) {
                val sharedPreferences = getSharedPreferences(options)
                val key = options["key"]
                if (key != null) {
                    try {
                        val editor = sharedPreferences.edit()
                        editor.remove(key)
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

    private fun getSharedPreferences(options: Map<String, String>): SharedPreferences {
        val context = getContext()
        val sharedPreferencesName = options["sharedPreferencesName"] ?: "SharedStorageModule"
        return context.getSharedPreferences(sharedPreferencesName, Context.MODE_PRIVATE)
    }
}
