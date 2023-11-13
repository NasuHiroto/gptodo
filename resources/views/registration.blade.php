@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Register</div>

                <div class="card-body">
                    <!-- Include the RegistrationForm component -->
                    @include('RegistrationForm')
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
