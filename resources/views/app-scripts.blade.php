<script type="text/javascript" charset="UTF-8">
    const MASTER_APP = {
        "BASE_URL": "{{ env('APP_URL', '127.0.0.1:8000') }}",
        "API_URL": "{{ env('API_URL', '127.0.0.1:8000') }}",
        "RECAPTCHA": "{{env('GOOGLE_RECAPTCHA_PUBLIC_KEY', '')}}"
    };
</script>