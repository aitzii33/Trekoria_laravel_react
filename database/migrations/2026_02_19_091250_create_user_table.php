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
        Schema::create('user', function (Blueprint $table) 
        {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('last_name')->nullable();
            $table->string('user_name')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->date('birth_day')->nullable();
            $table->binary('image')->nullable();

            $table->foreignId('type_user_id')->constrained('type_users')->cascadeOnDelete();

            $table->softDeletes();
            $table->rememberToken();
            $table->timestamps();

            // migration
            $table->uuid('pending_token')->nullable();
            $table->timestamp('pending_until')->nullable();
            $table->boolean('is_pending')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
};
