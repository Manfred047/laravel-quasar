
@component('mail::message')
<div>
    <div style="background: red; padding: 10px; text-align: center; color: white;">
        <img src="{{asset('/img/logo.png')}}" width="100px" alt="">
    </div>
</div>
@component('mail::panel')
    <div>
        <h4 style="text-align: center">Password Recovery</h4><div><h4>Hello: <span>{{ $username  }}</span></h4></div>
        <div><p>Are you having problems accessing your account?</p><br></div>
        <div><p><span>Reset my password.</span></p><br></div>
        <div><p style="color: red"><a href="{{ $url }}">Click here</a></p></div>
    </div>
@endcomponent

@endcomponent