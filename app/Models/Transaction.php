<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'date',
        'total',
        'pay_total'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
