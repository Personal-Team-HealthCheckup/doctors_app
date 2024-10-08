package com.doctor_app;


import android.content.Intent;
import android.os.Build;



import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ForegroundServiceModule extends ReactContextBaseJavaModule  {
    public ForegroundServiceModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ForegroundServiceModule";
    }

    @ReactMethod
    public void startService() {
        Intent serviceIntent = new Intent(getReactApplicationContext(), YourForegroundService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getReactApplicationContext().startForegroundService(serviceIntent);
        } else {
            getReactApplicationContext().startService(serviceIntent);
        }
    }


    @ReactMethod
    public void stopService() {
        Intent serviceIntent = new Intent(getReactApplicationContext(), YourForegroundService.class);
        getReactApplicationContext().stopService(serviceIntent);
    }

}
