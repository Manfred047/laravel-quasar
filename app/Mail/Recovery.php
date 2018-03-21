<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Recovery extends Mailable
{
    use Queueable, SerializesModels;

    private $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $url = url('new-password', [
            'email' => $this->data->email,
            'token' => $this->data->token
        ]);
        return $this->markdown('emails.recovery')
            ->subject('Password Recovery')
            ->with([
                'username' => $this->data->username,
                'url' => $url,
            ]);
    }
}
