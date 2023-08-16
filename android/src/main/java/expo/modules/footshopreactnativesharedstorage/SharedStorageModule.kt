package expo.modules.footshopreactnativesharedstorage

import android.content.Context
import android.content.SharedPreferences
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.modules.Promise

class SharedStorageModule : Module() {
  private lateinit var sharedPreferences: SharedPreferences

  init {
    sharedPreferences = context.getSharedPreferences("SharedStorageModule", Context.MODE_PRIVATE)
  }

  override fun definition() = ModuleDefinition {
    Name("SharedStorage")

    AsyncFunction("get") { key: String, promise: Promise ->
        launch(Dispatchers.Main) {
            try {
                val value = sharedPreferences.getString(key, null)
                promise.resolve(value)
            } catch (e: Exception) {
                promise.reject("GET_ERROR", "An error occurred while retrieving data.", e)
            }
        }
    }

    AsyncFunction("set") { params: Map<String, String>, promise: Promise ->
        launch(Dispatchers.Main) {
            try {
                val editor = sharedPreferences.edit()
                params.forEach { (key, value) ->
                    editor.putString(key, value)
                }
                editor.apply()
                promise.resolve(null)
            } catch (e: Exception) {
                promise.reject("SET_ERROR", "An error occurred while saving data.", e)
            }
        }
    }

    AsyncFunction("remove") { key: String, promise: Promise ->
        launch(Dispatchers.Main) {
            try {
                val editor = sharedPreferences.edit()
                editor.remove(key)
                editor.apply()
                promise.resolve(null)
            } catch (e: Exception) {
                promise.reject("REMOVE_ERROR", "An error occurred while removing data.", e)
            }
        }
    }
  }
}
