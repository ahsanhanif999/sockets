<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    /**
     * Get the messages and chat partners for the currently logged-in user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChatData(Request $request)
    {
        $user = $request->user();
        $userId = $user->id;
        $chatData = [];

        $messages = Message::where(function($q) use ($user) {
            $q->where('from_user_id', $user->id)->orWhere('to_user_id', $user->id);
        })->orderBy('id', 'desc')->get();

        $partners = [];
        foreach ($messages as $message) {
            if($message->sender && $message->recipient && $message->recipient->id == $user->id && !in_array($message->sender, $partners)){

                $partners[] = $message->sender;
            }else if($message->recipient && $message->sender && $message->sender->id == $user->id && !in_array($message->recipient, $partners)){

                $partners[] = $message->recipient;
            }
        }

        foreach ($partners as $key => $partner) {

            $partnerId = $partner->id;
            $partnerMessages = Message::where(function ($query) use ($userId, $partnerId) {
                $query->where('from_user_id', $userId)->where('to_user_id', $partnerId);
            })->orWhere(function ($query) use ($userId, $partnerId) {
                $query->where('from_user_id', $partnerId)->where('to_user_id', $userId);
            })->get();

            $chatData[$key]['messages'] = $partnerMessages;
            $chatData[$key]['id'] = $partnerId;
            $chatData[$key]['name'] = $partner->name;
        }

        $data = [
            'partners' => $partners,
            'messages' => $chatData,
        ];

        return response()->json($data);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'partner' => 'required|integer',
            'message' => 'required|string',
        ]);

        $message = new Message();
        $message->from_user_id = $request->user()->id;
        $message->to_user_id = $request->partner;
        $message->message = $request->message;
        $message->created_at = date('Y-m-d H:i:s');
        $message->updated_at = date('Y-m-d H:i:s');
        $message->save();

        return response()->json(['message' => 'Message created successfully.', 'data' => $message]);
    }
}
