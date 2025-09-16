<?php
if (function_exists('fastcgi_finish_request')) {
    echo "✅ fastcgi_finish_request está disponible en este servidor.";
} else {
    echo "❌ fastcgi_finish_request NO está disponible en este servidor.";
}

