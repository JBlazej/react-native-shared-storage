package expo.modules.footshopreactnativesharedstorage

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SharedStorageModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("SharedStorage")

    // TODO implement methods
    AsyncFunction("get") { message: String, promise: Promise ->
      launch(Dispatchers.Main) {
        promise.resolve(message)
      }
    }

    // TODO implement methods
    AsyncFunction("set") { message: String, promise: Promise ->
      launch(Dispatchers.Main) {
        promise.resolve(message)
      }
    }

    // TODO implement methods
    AsyncFunction("remove") { message: String, promise: Promise ->
      launch(Dispatchers.Main) {
        promise.resolve(message)
      }
    }
  }
}
