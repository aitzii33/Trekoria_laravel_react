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
        Schema::table('guides', function (Blueprint $table) {
          /*  // Add foreign key
            $table->foreign('id_activity')
                  ->references('id')
                  ->on('activities')
                  ->cascadeOnDelete();*/
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('guides', function (Blueprint $table) {
             $table->dropForeign(['id_activity']);
        });
    }
};
