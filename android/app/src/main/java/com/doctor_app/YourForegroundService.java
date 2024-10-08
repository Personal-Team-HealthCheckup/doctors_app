package com.doctor_app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import android.content.pm.ServiceInfo;

public class YourForegroundService extends Service {
    private static final String TAG = "YourForegroundService";
    private static final int NOTIFICATION_ID = 1;
    private static final String CHANNEL_ID = "ForegroundServiceChannel";
    private boolean joined = true; // Assume 'joined' is defined to manage your service state

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        Notification notification = getDefaultNotification();
        
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            int serviceTypes = ServiceInfo.FOREGROUND_SERVICE_TYPE_MICROPHONE |
                ServiceInfo.FOREGROUND_SERVICE_TYPE_CAMERA |
                ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK;
                startForeground(NOTIFICATION_ID, notification, serviceTypes);
            } else {
                startForeground(NOTIFICATION_ID, notification);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error starting foreground service", e);
        }
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopForeground(true); 
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        super.onTaskRemoved(rootIntent);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Foreground Service Channel",
                    NotificationManager.IMPORTANCE_LOW // Set importance level
            );
            channel.setDescription("Channel for foreground service");
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification getDefaultNotification() {
        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Foreground Service Running")
                .setContentText("This service is required for background streaming.")
                .setSmallIcon(R.drawable.ic_notification_icon) // Ensure this icon exists
                .setPriority(NotificationCompat.PRIORITY_LOW) // Set priority for backward compatibility
                .setCategory(NotificationCompat.CATEGORY_SERVICE) // Set the category for services
                .build();
    }
}
