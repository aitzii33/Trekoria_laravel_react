<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
/*        Schema::table('activities', function (Blueprint $table) {
             $table->decimal('price', 8, 2)->nullable()->after('location'); // price
            $table->boolean('is_active')->default(true)->after('price');    // status
            $table->date('date')->nullable()->after('is_active');           // date field
        });*/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('activities', function (Blueprint $table) {
        //$table->dropColumn('price'); $table->dropColumn(['price', 'is_active', 'date']);
        });
    }
};
