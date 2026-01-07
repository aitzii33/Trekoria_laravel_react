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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('id_place')->unsigned();
            $table->string('name');
            $table->string('description');
            $table->string('continent');
            $table->string('imagen')->nullable();
            $table->timestamps();

            $table->foreignId('id_place')->constrained()->onDelete('cascade'); //what the name of the column id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
