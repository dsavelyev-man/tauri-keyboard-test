package com.tttt.app

import android.webkit.WebView
import androidx.lifecycle.Observer

class MainActivity : TauriActivity() {
  private var keyboardTriggerBehavior: KeyboardTriggerBehavior? = null

  override fun onWebViewCreate(webView: WebView) {
    super.onWebViewCreate(webView)
    //          webView.loadUrl("javascript:window.keyboardStatusChanged(true)")

    val activity = this ?: return
    keyboardTriggerBehavior = KeyboardTriggerBehavior(activity, 120).apply {
      observe(activity, Observer {
        when (it) {
          KeyboardTriggerBehavior.Status.OPEN -> webView.loadUrl("javascript:keyboardStatusChanged(true)")
          KeyboardTriggerBehavior.Status.CLOSED ->  webView.loadUrl("javascript:keyboardStatusChanged(false)")
        }
      })
    }
//    webView.loadUrl("javascript:alert('test')")
  }
}
