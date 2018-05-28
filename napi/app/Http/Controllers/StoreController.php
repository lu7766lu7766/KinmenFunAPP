<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class StoreController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function showAll()
    {
        $store = DB::table('t_store')->count();
        // selest
        // 分頁直接使用 Pagination
        //whereBetween / whereNotBetween
        //whereIn / whereNotIn
        //whereDate / whereMonth / whereDay / whereYear
//        >orderBy('name', 'desc')
//        ->select('department', DB::raw('SUM(price) as total_sales'))
//        ->groupBy('department')
//        ->havingRaw('SUM(price) > 2500')
//        ->get();
//        ->offset(10)
//        ->limit(5)

        // insert
//        DB::table('users')->insert(
//            ['email' => 'john@example.com', 'votes' => 0]
//        );
//        DB::table('users')->insert([
//            ['email' => 'taylor@example.com', 'votes' => 0],
//            ['email' => 'dayle@example.com', 'votes' => 0]
//        ]);
//        $id = DB::table('users')->insertGetId(
//            ['email' => 'john@example.com', 'votes' => 0]
//        );

        // update
//        DB::table('users')
//            ->where('id', 1)
//            ->update(['votes' => 1]);

        // delete
//        DB::table('users')->delete();
//
//        DB::table('users')->where('votes', '>', 100)->delete();
//
//        DB::table('users')->truncate();

        //$store = DB::select('select * from t_store');
        echo "&&&".json_encode($store);
        return view('greeting', ['name' => 'Jaccc','store' => json_encode($store)]);
    }
}