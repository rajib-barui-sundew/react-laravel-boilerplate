<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoginNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $ipAddress;
    protected $userAgent;
    protected $time;
    protected $isAdmin;

    /**
     * Create a new notification instance.
     */
    public function __construct($ipAddress, $userAgent, $isAdmin = false)
    {
        $this->ipAddress = $ipAddress;
        $this->userAgent = $userAgent;
        $this->time = now();
        $this->isAdmin = $isAdmin;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $accountType = $this->isAdmin ? 'Admin' : 'User';
        
        return (new MailMessage)
            ->subject("New {$accountType} Login Detected")
            ->greeting("Hello {$notifiable->full_name}!")
            ->line("We detected a new login to your {$accountType} account.")
            ->line("Time: {$this->time->format('Y-m-d H:i:s')}")
            ->line("IP Address: {$this->ipAddress}")
            ->line("Device: {$this->userAgent}")
            ->line("If this was you, no further action is required.")
            ->line("If you didn't login, please secure your account immediately by changing your password.")
            ->action('Manage Account', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'ip_address' => $this->ipAddress,
            'user_agent' => $this->userAgent,
            'time' => $this->time,
            'is_admin' => $this->isAdmin
        ];
    }
}