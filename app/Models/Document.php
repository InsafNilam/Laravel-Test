<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ref_id',
        'ref_name',
        'path',
        'version',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
