<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\FileService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $fileService;

    public function __construct(FileService $fileService)
    {
        $this->fileService = $fileService;
    }

    public function index()
    {
        //
        return Inertia::render('User/Index', [
            'users' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:8',
            ]);

            $data['email_verified_at'] = time();
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);

            $file = null;
            $image = $request->file('image') ?? null;
            if ($image) {
                $response = $this->fileService->upload('users', $user->id, $image)->getData();
                $file = $response->file;
                $data['image'] = $response->path;

                $user->update($data);
            }

            DB::commit();

            return to_route('user.index')
                ->with('success', 'User was created');
        } catch (Exception $e) {
            DB::rollback();
            if ($file) {
                $this->fileService->deleteFile($file->path);
            }

            throw $e;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        try {
            DB::beginTransaction();

            $data = $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'nullable|confirmed|min:8',
            ]);

            $image = $request->file('image') ?? null;
            if ($image) {
                $response = $this->fileService->update('users', $user->id, $image)->getData();
                $file = $response->file;
                $data['image'] = $response->path;
            }

            $user->update($data);
            DB::commit();

            return redirect()->route('user.index')->with('success', 'User was updated');
        } catch (Exception $e) {
            DB::rollback();
            if ($file) {
                $this->fileService->deleteFile($file->path);
            }

            throw $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        try {
            DB::beginTransaction();

            $this->fileService->deleteAll('users', $user->id);
            $user->delete();

            DB::commit();

            return redirect()->route('user.index')->with('success', 'User was deleted');
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
