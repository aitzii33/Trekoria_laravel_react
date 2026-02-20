<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Validation\Validator;
use Inertia\Inertia;

class PayController extends Controller
{
    public function form(Request $request)
    {
        // Obtener el total del carrito desde la URL
        $total = $request->query('total', 0);

        // Pasar el total a la vista
        return Inertia::render('Payment', [
            'total' => $total,
        ]);
    }

    public function dataVerify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'direccion' => 'required|string|max:255',
            'dni' => 'required|string',
            'card_number' => 'required|string',
            'cvv' => 'required|string',
            'exp_month' => 'required|string|size:2',
            'exp_year' => 'required|string|size:2',
        ]);

        if ($validator->fails()) 
        {
            return back()->withErrors($validator)->withInput();
        }

        $direccionValida = $this->existStreet($request->direccion);
        
        if (!$direccionValida) 
        {
            return back()->withErrors(['direccion' => 'The streat does not exist'])->withInput();
        }

        if (!$this->validateDNI($request->dni)) 
        {
            return back()->withErrors(['dni' => 'invalid DNI'])->withInput();
        }

        if (!$this->validarLuhn($request->card_number)) 
        {
            return back()->withErrors(['card_number' => 'invalid nomber credit card'])->withInput();
        }

        if (!$this->validarCVV($request->cvv)) 
        {
            return back()->withErrors(['cvv' => 'invalid CVV (3-4 digits)'])->withInput();
        }

        if (!$this->validarFechaExp($request->exp_month, $request->exp_year)) 
        {
            return back()->withErrors(['exp_month' => 'Expired card'])->withInput();
        }
        
        return redirect()->route('pay.success')->with('status', '¡Pago procesado!');
    }

    public function ExistStreat($direccion) 
    {

        $url = "https://nominatim.openstreetmap.org/search?" . http_build_query([ 'q' => $direccion, 'format' => 'json', 'addressdetails' => 1, 'limit' => 1]);

        $opts = [
            "http" => [
                "header" => "User-Agent: PHP-calle-checker/1.0\r\n"
            ]
        ];

        $context = stream_context_create($opts);
        $json = file_get_contents($url, false, $context);

        if ($json === false) 
        {
            return false;
        }

        $data = json_decode($json, true);

        return !empty($data);
    }

    public function validateDNI($dni) 
    {
        $dni = strtoupper(trim($dni));

        if (!preg_match('/^[0-9]{8}[A-Z]$/', $dni)) 
        {
            return false;
        }

        $numero = substr($dni, 0, 8);
        $letra  = substr($dni, -1);
        $letras = "TRWAGMYFPDXBNJZSQVHLCKE";

        $letraCorrecta = $letras[$numero % 23];

        return $letra === $letraCorrecta;
    }

    public function validarLuhn($numero) 
    {
        $numero = preg_replace('/\D/', '', $numero);
        $sum = 0;
        $par = false;

        for ($i = strlen($numero) - 1; $i >= 0; $i--) 
        {
            $digito = intval($numero[$i]);

            if ($par) 
            {
                $digito *= 2;
                if ($digito > 9) $digito -= 9;
            }

            $sum += $digito;
            $par = !$par;
        }

        return ($sum % 10) === 0;
    }


    public function validarCVV($cvv) 
    {
        return preg_match('/^[0-9]{3,4}$/', $cvv);
    }


    public function validarFechaExp($mes, $anio) 
    {
        $anio = (int)("20" . $anio);
        $mes  = (int)$mes;

        if ($mes < 1 || $mes > 12) return false;

        $ahora = new DateTime();
        $fechaExp = DateTime::createFromFormat('Y-m', $anio . '-' . $mes);

        return $fechaExp >= (new DateTime('first day of this month'));
    }

/*
    public function __construct()
	{
	    $this->middleware('auth');
	}*/
}
