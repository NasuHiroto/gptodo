<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToDo\StoreRequest;
use App\Http\Requests\ToDo\UpdateRequest;
use App\Models\ToDo;
use App\Models\ToDoDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //ToDoを取得する
        $toDos = ToDo::with('toDoDetails')->get();


        //取得したToDoを返却する
        return $toDos;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        //新規のToDoモデルを作成する
        $toDo = new ToDo();

        //タイトルをToDoモデルに設定する
        $toDo->title = $request->get('title');

        //空のToDoDetailを作成する
        $toDoDetail = new ToDoDetail();
        $toDoDetail->name = null;
        $toDoDetail->completed_flag = false;

        //DBにデータを登録する
        DB::transaction(function () use ($toDo, $toDoDetail) {
            $toDo->save();
            $toDo->toDoDetails()->save($toDoDetail);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        //IDに紐づくToDoモデルを取得する
        $toDo = ToDo::find($id);

        //タイトルをToDoモデルに設定する
        $toDo->title = $request->get('title');

        //ToDoデータベースを更新する
        $toDo->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //IDに紐づくToDoモデルを取得する
        $toDo = ToDo::find($id);

        //ToDoデータベースから対象のレコードを削除する
        $toDo->delete();
    }
}
