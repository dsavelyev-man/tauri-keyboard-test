use tauri::{Listener, Manager};
use tauri::{AppHandle, Emitter, Builder};

struct AppData {
    welcome_message: &'static str,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn download(app: AppHandle, url: String) {
  app.emit("download-started", &url).unwrap();
  println!("test2");
  for progress in [1, 15, 50, 80, 100] {
    app.emit("download-progress", 10).unwrap();
  }
  app.emit("download-finished", &url).unwrap();
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    #[cfg(debug_assertions)]
    let mut builder = tauri::Builder::default();

    #[cfg(not(debug_assertions))]
    let mut builder = tauri::Builder::default();

    builder = builder
     .plugin(tauri_plugin_shell::init())
     .invoke_handler(tauri::generate_handler![greet, download]);

    builder.run(tauri::generate_context!())
        .expect("error while running tauri application");
}
