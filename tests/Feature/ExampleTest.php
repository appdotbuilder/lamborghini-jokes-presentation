<?php

it('returns a successful response', function () {
    $response = $this->get('/');

    // Unauthenticated users should be redirected to login
    $response->assertRedirect('/login');
});
