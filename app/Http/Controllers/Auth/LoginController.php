<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    // ログインフォームを表示
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // ログイン認証を処理
    protected function authenticated(Request $request, $user)
    {
        // ログイン後のリダイレクト先を設定（必要に応じて変更）
        return redirect('/home');
    }
}
