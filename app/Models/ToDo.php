<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ToDo extends Model
{
    use HasFactory;

    public function toDoDetails()
    {
        return $this->hasMany(ToDoDetail::class, 'to_do_id');
    }
    public function delete()
    {
        //関連するToDoDetailのレコードを削除する
        $this->toDoDetails()->delete();

        //ToDoのレコードを削除する
        return parent::delete();
    }
}
